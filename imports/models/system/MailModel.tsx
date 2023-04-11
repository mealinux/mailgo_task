export default interface MailModel {
  subject: string;
  toEmail?: string;
  content?: string;
  target: string;
}
