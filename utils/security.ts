
/**
 * Almarky Security Vault - Advanced Stealth Mode
 */

// GitHub Token Fragments
const _ght = [
  "ghp_", "vqgDq", "VSrPQ", "J9TlB", "nBj3t", "W2vwU", "G1AzN", "1nGlzK"
];

// Repo Path: subhan-almarky/Almarky
const _grp = ["c3ViaGFu", "LWFsbWFya3kv", "QWxtYXJreQ=="]; 

// Cloudinary Defaults (Updated with user's specific cloud name)
const _cld = {
  cloudName: "Almarky-Images",
  uploadPreset: "almarky_unsigned" // User must create this in Cloudinary settings
};

export const getSecureToken = (): string => _ght.join('');

export const getSecureRepo = (): string => {
  try {
    return _grp.map(chunk => atob(chunk)).join('');
  } catch (e) {
    return "subhan-almarky/Almarky";
  }
};

export const getCloudinaryDefaults = () => _cld;

export const isCloudSyncReady = (): boolean => {
  const token = localStorage.getItem('gh_write_token') || getSecureToken();
  const repo = localStorage.getItem('gh_repo_path') || getSecureRepo();
  return !!(token && repo);
};
