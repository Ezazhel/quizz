export class Question {
    constructor({ id, question, bonneReponse, autreReponses, themeId }) {
        console.log("const question", id);
        this.id = id;
        this.question = question;
        this.bonneReponse = bonneReponse;
        this.autreReponses = autreReponses;
        this.themeId = themeId;
    }
}
