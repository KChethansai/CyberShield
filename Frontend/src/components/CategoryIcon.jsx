import {
  MdOutlinePhishing,
  MdLockOutline,
  MdQrCode2,
  MdWarningAmber,
} from 'react-icons/md';

const ICONS = {
  phishing: MdOutlinePhishing,
  password: MdLockOutline,
  qr: MdQrCode2,
  scam: MdWarningAmber,
};

export default function CategoryIcon({ category, size = 22 }) {
  const Icon = ICONS[category];
  if (!Icon) return null;
  return <Icon size={size} className="cat-icon" aria-hidden="true" />;
}
