export function singleSlash(url: string) {
  const protocolMatch = url.match(/^(https?:\/\/)/);

  if (protocolMatch) {
    const protocol = protocolMatch[1]!;
    const restOfUrl = url.slice(protocol.length);

    const normalizedRest = restOfUrl.replace(/\/+/g, '/');

    return protocol + normalizedRest;
  }
  else {
    return url.replace(/\/+/g, '/');
  }
}
