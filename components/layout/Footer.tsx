import Link from 'next/link';

export function Footer() {
  return (
    <footer className="container footer">
      <div className="footer-grid">
        <div>
          <p className="footer-title">Navigation</p>
          <ul>
            <li><Link href="/research">Research</Link></li>
            <li><Link href="/philosophy">Philosophy</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="footer-title">Fiduciary Commitments</p>
          <p>No fees accepted from any investment company.</p>
          <p><a className="text-link" href="#">Form ADV (placeholder)</a></p>
          <p><a className="text-link" href="#">Code of Ethics (placeholder)</a></p>
        </div>
        <div>
          <p className="footer-title">Office</p>
          <p>4949 Meadows Road, Suite 600</p>
          <p>Lake Oswego, Oregon 97035</p>
          <p>(503) 635-5042 · bill@billparish.com</p>
        </div>
      </div>
    </footer>
  );
}
