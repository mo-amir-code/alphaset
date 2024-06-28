interface Answer{
    [key:string]:string
}

enum AnswerEnum{
    ts="ts",
    src="src",
    tw="tailwind",
    redux="redux",
    context="context"
}

enum AnswerChoices{
    Yes="Yes",
    No="No"
}

interface AddSetupFileIntoProjectTypes {
    isTs: boolean,
    isSrc: boolean,
    setupName: string
}


export { Answer, AnswerEnum, AnswerChoices, AddSetupFileIntoProjectTypes };