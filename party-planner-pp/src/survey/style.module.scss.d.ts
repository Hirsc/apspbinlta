import globalClassNames, { ClassNames as GlobalClassNames } from "..style.d";
declare const classNames: typeof globalClassNames & {
  readonly cell: "cell";
};
export default classNames;
export type ClassNames = "cell" | GlobalClassNames;
