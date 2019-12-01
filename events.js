const { withHermes } = require('hermes-javascript')

const addressIp = "192.168.0.18";
let array = ["Jouer"];

withHermes(hermes => {
    const dialog = hermes.dialog();

    // Intéragit sur les évènements
    dialog.flow('agoliot:interactEvent', (msg, flow) => {
        // Log intent message
        //console.log(JSON.stringify(msg));
        console.log(`intent: ${msg.intent.intentName} : ${msg.input}`);
        
        // Ajoute moi l'évènement []
        flow.continue('agoliot:addEvent', (msg, flow) => {
            // Log intent message
            //console.log(JSON.stringify(msg));
            console.log(`intent: ${msg.intent.intentName} : ${msg.input}`);
            console.log(JSON.stringify(msg.slots));
            // End the session
            flow.end();
            // Use text to speech
            if(!msg.slots || msg.slots.length == 0){
                return `Je n'ai pas compris l'évènement`;
            }
            const event = msg.slots[0].rawValue;
            array.push(event);
            return `Ajout de l'évènement ${event}`;
        })

        // Liste moi les évènements
        flow.continue('agoliot:listEvent', (msg, flow) => {
            // Log intent message
            //console.log(JSON.stringify(msg));
            console.log(`intent: ${msg.intent.intentName} : ${msg.input}`);
            // End the session
            flow.end();
            // Use text to speech
            if(array.length == 0){
                return `Il n'y a aucun évènements`;
            }
            const listString = array.join(' ');
            return `Les évènements sont les suivants ${listString}`;
        })

        // Réinitialise les évènements
        flow.continue('agoliot:resetEvents', (msg, flow) => {
            // Log intent message
            // console.log(JSON.stringify(msg));
            console.log(`intent: ${msg.intent.intentName} : ${msg.input}`);
            // End the session
            flow.end();
            // Use text to speech
            array = [];
            return `Réinitialisation de tous les évènements`;
        })
        return `Je peux ajouter, lister ou réinitialiser les évènements`;
    })
}, {address: `${addressIp}:1883`})