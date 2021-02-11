import { GoogleSpreadsheetRow } from "google-spreadsheet";

export interface Props {
  close: () => void;
  title: string;
  headline: string;
  claimable: string;
  claim: () => void;
  submit: () => void;
  inviteRows: GoogleSpreadsheetRow[]
}