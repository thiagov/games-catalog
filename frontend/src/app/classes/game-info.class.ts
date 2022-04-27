export class GameInfo {
    id!: number;
    title!: string;
    year!: number;
    consoleName!: string;
    completionDate: Date | undefined;
    personalNotes: string | undefined;
}
