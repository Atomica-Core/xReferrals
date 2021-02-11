import { GoogleSpreadsheetRow } from "google-spreadsheet";

export interface Props {
  close: () => void;
  title: string;
  headline: string;
  description: string;
  inputValue: string;
  onChangeValue: (value: string) => void;
  submit: () => void;
  inviteRows: GoogleSpreadsheetRow[]
}