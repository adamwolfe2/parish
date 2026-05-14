export function InquiryForm() {
  return (
    <form className="inquiry-form" action="#" method="post">
      <label>
        Name
        <input name="name" type="text" required />
      </label>
      <label>
        Email
        <input name="email" type="email" required />
      </label>
      <label>
        Type of inquiry
        <select name="inquiryType" defaultValue="general">
          <option value="general">General</option>
          <option value="media">Media</option>
          <option value="prospective-client">Prospective client</option>
        </select>
      </label>
      <label>
        Message
        <textarea name="message" rows={5} required />
      </label>
      <button type="submit">Send inquiry</button>
    </form>
  );
}
