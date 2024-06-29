interface Answer{
    [key:string]:string
}

enum AnswerEnum{
    ts="ts",
    nextjs="nextjs",
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
    isNextJs?: boolean,
    isSrc: boolean,
    setupName: string
}

interface FileTransportType{
    source: string,
    destination: string
}


export { Answer, AnswerEnum, AnswerChoices, AddSetupFileIntoProjectTypes, FileTransportType };