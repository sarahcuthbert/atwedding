import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
// import serverless from 'serverless-http';
import {getInviteesByEmail} from './services/getInvitees';
import {postResponses} from "./services/postRSVP";

dotenv.config();

const app = express();
app.use(express.json());

app.get('/invitees', (req: Request, res: Response) => {
    const email = req.query.email as string;
    if (!email) {
        res.status(400).json({error: 'missing email in request'});
        return;
    }

    getInviteesByEmail(email).then((invitees) => {
            if (!invitees || invitees.length > 0) {
                res.status(200).json({invitees});
            } else {
                console.log("404 error")

                res.status(404).json({error: 'Invitation not found'});
            }
        }
    ).catch(e => {
        console.log("error", e)
        res.status(500).json({error: `Error finding invitation: ${e}`});
    })
});

app.post('/rsvp', (req: Request, res: Response) => {
    const responses = req.body.responses;
    if (!responses) {
        res.status(400).json({error: 'missing rsvps in request'});
        return;
    }

    postResponses(responses)
        .then(() => res.status(201).send("Successfully added RSVP"))
        .catch(e => {
        console.log("error", e)
        res.status(500).json({error: `Error posting rsvps: ${e}`});
    })
});

if(process.env.IS_LOCAL) {
    app.listen('5000', () => {
        console.log(`Server is running on http://localhost:5000`);
    });
}

// module.exports.handler = serverless(app);
