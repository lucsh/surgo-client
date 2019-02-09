export default function(variable, singular, plural) {
  if (!variable || variable === 0) {
    return `sin ${plural}`;
  } else if (variable === 1) {
    return `${variable} ${singular}`;
  } else {
    return `${variable} ${plural}`;
  }
}
