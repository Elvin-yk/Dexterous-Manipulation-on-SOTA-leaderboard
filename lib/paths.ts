export const withBasePath = (assetPath: string) => {
  if (!assetPath.startsWith("/")) return assetPath;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!basePath) return assetPath;
  return `${basePath}${assetPath}`;
};
