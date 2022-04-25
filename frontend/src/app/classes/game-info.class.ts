export class GameInfo {
    id!: number;
    title!: string;
    year: number | undefined;
    consoleName!: string;
    completionDate: Date | undefined;
    personalNotes: string | undefined;
}