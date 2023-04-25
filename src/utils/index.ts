export function YouTubeGetID(url: string) {
  const formatUrl = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return formatUrl[2] !== undefined
    ? formatUrl[2].split(/[^0-9a-z_\-]/i)[0] // eslint-disable-line
    : formatUrl[0];
}
