export interface AthokpamMember {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: 'M' | 'F';
  fatherId?: string | null;
  motherId?: string | null;
  spouseId?: string | null;
  birthDate?: string;
  deathDate?: string;
  occupation?: string;
  education?: string;
  address?: string;
  bio?: string;
  photoUrl?: string;
  isDirectAncestor?: boolean;
  isSubject?: boolean; // Banishwor
  relationToBanishwor?: string;
  generation: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

// Convert Google Drive view URLs to high-speed CDN thumbnail URLs that never fail CORS
export function getOptimizedPhotoUrl(url?: string): string | undefined {
  if (!url) return undefined;
  const match = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w400`;
  }
  return url;
}

export const CLAN_METADATA = {
  salai: 'Luwang Salai',
  salaiMayek: 'ꯂꯨꯋꯥꯡ ꯁꯂꯥꯏ',
  surname: 'Athokpam',
  surnameMayek: 'ꯑꯊꯣꯛꯄꯝ',
  ancestorTitle: 'Athokpamcha',
  heraldicColor: '#4F46E5', // Indigo Heritage
  salaiColor: '#E0E7FF', // Silver White / Ice
  totem: 'Luwang Ningthou',
  portalUrl: 'https://banishwor.github.io/AthokpamFamilyTree/',
  apiEndpoint: 'https://script.google.com/macros/s/AKfycbzBVoD591uVO_31PT1re7QEM-Rlnw0fYvCGFh5DohRLrgHkBfRiRs3kPJtGBDg53nj3/exec'
};

// All 42 verified members from the Athokpam Family Tree live database
export const athokpamFamilyMembers: AthokpamMember[] = [
  // ================= GENERATION 1: ROOTS =================
  {
    id: "67d85ca0-7224-40eb-b4bc-cc93a0ef321b",
    firstName: "Tonu",
    lastName: "Athokpamcha",
    gender: "M",
    spouseId: "da98a412-863c-4a91-9577-536d778428e0",
    generation: 1,
    isDirectAncestor: true,
    relationToBanishwor: "4th Great-Grandfather (The Root Patriarch)",
    bio: "Earliest recorded patriarch of the Athokpam lineage in the family archives."
  },
  {
    id: "da98a412-863c-4a91-9577-536d778428e0",
    firstName: "Kola",
    middleName: "Chanu",
    lastName: "Yumnam",
    gender: "F",
    spouseId: "67d85ca0-7224-40eb-b4bc-cc93a0ef321b",
    generation: 1,
    isDirectAncestor: true,
    relationToBanishwor: "4th Great-Grandmother",
    bio: "Matriarch of the founding generation, hailing from the Yumnam clan."
  },

  // ================= GENERATION 2 =================
  {
    id: "ceb83b61-35ec-43d8-993e-211f06054a51",
    firstName: "Tolen",
    lastName: "Athokpamcha",
    gender: "M",
    fatherId: "67d85ca0-7224-40eb-b4bc-cc93a0ef321b",
    motherId: "da98a412-863c-4a91-9577-536d778428e0",
    spouseId: "f38ac771-75d2-4099-bd95-17e441c9ba6a",
    generation: 2,
    isDirectAncestor: true,
    relationToBanishwor: "3rd Great-Grandfather",
    bio: "Carried forward the Athokpam heritage in the second recorded generation."
  },
  {
    id: "f38ac771-75d2-4099-bd95-17e441c9ba6a",
    firstName: "Shajoubi",
    middleName: "Chanu",
    lastName: "Lourembam",
    gender: "F",
    spouseId: "ceb83b61-35ec-43d8-993e-211f06054a51",
    generation: 2,
    isDirectAncestor: true,
    relationToBanishwor: "3rd Great-Grandmother",
    bio: "Spouse of Tolen Athokpamcha, representing the Lourembam clan."
  },

  // ================= GENERATION 3 =================
  {
    id: "6f37e528-1bb4-4739-9c37-f656292dd13d",
    firstName: "Thaniljao",
    lastName: "Athokpamcha",
    gender: "M",
    fatherId: "ceb83b61-35ec-43d8-993e-211f06054a51",
    motherId: "f38ac771-75d2-4099-bd95-17e441c9ba6a",
    spouseId: "f74e238c-5f56-40ce-8b01-e59be4b97cc2",
    generation: 3,
    isDirectAncestor: true,
    relationToBanishwor: "2nd Great-Grandfather (Great-Great-Grandfather)",
    bio: "Pillar of the 3rd generation, father of Master Shamu and his siblings."
  },
  {
    id: "f74e238c-5f56-40ce-8b01-e59be4b97cc2",
    firstName: "Thouranishabi",
    middleName: "Chanu",
    lastName: "Asem",
    gender: "F",
    spouseId: "6f37e528-1bb4-4739-9c37-f656292dd13d",
    generation: 3,
    isDirectAncestor: true,
    relationToBanishwor: "2nd Great-Grandmother",
    bio: "Spouse of Thaniljao Athokpamcha, from the Asem clan."
  },
  {
    id: "ab2d84c3-8780-4b41-9793-3c34ce042a27",
    firstName: "Ningthou",
    lastName: "Athokpamcha",
    gender: "M",
    fatherId: "ceb83b61-35ec-43d8-993e-211f06054a51",
    motherId: "f38ac771-75d2-4099-bd95-17e441c9ba6a",
    generation: 3,
    relationToBanishwor: "Paternal Great-Great-Uncle",
    bio: "Brother of Thaniljao Athokpamcha."
  },

  // ================= GENERATION 4 =================
  {
    id: "11bdaa40-dd32-46e0-be5b-7b03e4778b69",
    firstName: "Athokpam",
    middleName: "Master",
    lastName: "Shamu",
    gender: "M",
    fatherId: "6f37e528-1bb4-4739-9c37-f656292dd13d",
    motherId: "f74e238c-5f56-40ce-8b01-e59be4b97cc2",
    spouseId: "b8f95465-6bbf-40a0-9e3d-5b028b8759e5",
    generation: 4,
    isDirectAncestor: true,
    relationToBanishwor: "Great-Grandfather",
    occupation: "Master / Teacher",
    bio: "Respected educator and community master known across Thoubal and Kakching."
  },
  {
    id: "b8f95465-6bbf-40a0-9e3d-5b028b8759e5",
    firstName: "Yumnam",
    middleName: "Chanu",
    lastName: "Mangolngambi",
    gender: "F",
    spouseId: "11bdaa40-dd32-46e0-be5b-7b03e4778b69",
    generation: 4,
    isDirectAncestor: true,
    relationToBanishwor: "Great-Grandmother",
    photoUrl: "https://drive.google.com/uc?export=view&id=1D_vBXs_W_I4HgGvj1slsMXGKOhKN5T24",
    bio: "Matriarch of the 4th generation, remembered for her wisdom and grace."
  },
  {
    id: "e131e7ac-b69f-4172-b593-175e36d63a2a",
    firstName: "Jugeshwor",
    lastName: "Athokpamcha",
    gender: "M",
    fatherId: "6f37e528-1bb4-4739-9c37-f656292dd13d",
    motherId: "f74e238c-5f56-40ce-8b01-e59be4b97cc2",
    generation: 4,
    relationToBanishwor: "Paternal Great-Granduncle"
  },
  {
    id: "8532774e-52bd-45e1-bc02-49f0044e0f73",
    firstName: "Tababi",
    lastName: "Athokpamcha",
    gender: "F",
    fatherId: "6f37e528-1bb4-4739-9c37-f656292dd13d",
    motherId: "f74e238c-5f56-40ce-8b01-e59be4b97cc2",
    generation: 4,
    relationToBanishwor: "Paternal Great-Grandaunt"
  },
  {
    id: "21da1750-a8dd-4051-9ab0-0a3e07ff33af",
    firstName: "Shyamachau",
    lastName: "Athokpamcha",
    gender: "M",
    fatherId: "6f37e528-1bb4-4739-9c37-f656292dd13d",
    motherId: "f74e238c-5f56-40ce-8b01-e59be4b97cc2",
    generation: 4,
    relationToBanishwor: "Paternal Great-Granduncle"
  },

  // ================= GENERATION 5: PARENTS & UNCLES =================
  {
    id: "019ac88e-984e-46b2-a273-f739b80c0546",
    firstName: "Athokpamcha",
    lastName: "Basanta",
    gender: "M",
    fatherId: "11bdaa40-dd32-46e0-be5b-7b03e4778b69",
    motherId: "b8f95465-6bbf-40a0-9e3d-5b028b8759e5",
    spouseId: "fe01ce14-a712-42a1-a029-aff99d3035a9",
    birthDate: "1967-01-29",
    occupation: "Teacher",
    education: "B.A.",
    generation: 5,
    isDirectAncestor: true,
    relationToBanishwor: "Father",
    photoUrl: "https://drive.google.com/uc?export=view&id=1gkZQmw9dJ8i0FEK25-5y16AkShHAKQ5h",
    bio: "Dedicated teacher and mentor, father of Banikanta, Banishwor, and Bishwal."
  },
  {
    id: "fe01ce14-a712-42a1-a029-aff99d3035a9",
    firstName: "Nongthombam",
    middleName: "Chanu",
    lastName: "Anita",
    gender: "F",
    spouseId: "019ac88e-984e-46b2-a273-f739b80c0546",
    birthDate: "1976-09-09",
    generation: 5,
    isDirectAncestor: true,
    relationToBanishwor: "Mother",
    photoUrl: "https://drive.google.com/uc?export=view&id=1U2b7OKw6FMWtuPMYh0lQFGNgMLV8OkX0",
    bio: "Loving mother, family anchor, and pillar of warmth and tradition."
  },
  {
    id: "87d69f91-17e5-4b48-82b2-6e5f9ca4b5da",
    firstName: "Athokpamcha",
    lastName: "Priyokumar",
    gender: "M",
    fatherId: "11bdaa40-dd32-46e0-be5b-7b03e4778b69",
    motherId: "b8f95465-6bbf-40a0-9e3d-5b028b8759e5",
    spouseId: "59566712-7cb8-46a8-b569-9c242784d951",
    birthDate: "1950-01-01",
    generation: 5,
    relationToBanishwor: "Paternal Eldest Uncle (Khura / Pabung)"
  },
  {
    id: "59566712-7cb8-46a8-b569-9c242784d951",
    firstName: "Mema",
    lastName: "Athokpam",
    gender: "F",
    spouseId: "87d69f91-17e5-4b48-82b2-6e5f9ca4b5da",
    generation: 5,
    relationToBanishwor: "Paternal Aunt (Iche / Ene)"
  },
  {
    id: "2d5051c0-dbc6-40d1-acb2-49227463a193",
    firstName: "Athokpamcha",
    lastName: "Radhamani",
    gender: "M",
    fatherId: "11bdaa40-dd32-46e0-be5b-7b03e4778b69",
    motherId: "b8f95465-6bbf-40a0-9e3d-5b028b8759e5",
    spouseId: "2960d77d-3658-486a-9ef1-a388000aa1f0",
    birthDate: "1955-01-01",
    deathDate: "2003-01-01",
    generation: 5,
    relationToBanishwor: "Paternal Uncle (Khura)"
  },
  {
    id: "2960d77d-3658-486a-9ef1-a388000aa1f0",
    firstName: "Bino",
    lastName: "Athokpam",
    gender: "F",
    spouseId: "2d5051c0-dbc6-40d1-acb2-49227463a193",
    birthDate: "1957-02-01",
    generation: 5,
    relationToBanishwor: "Paternal Aunt (Inao / Ene)"
  },
  {
    id: "b7748ccb-13e9-461d-9b65-56cca8619c53",
    firstName: "Athokpamcha",
    lastName: "Indubhusan",
    gender: "M",
    fatherId: "11bdaa40-dd32-46e0-be5b-7b03e4778b69",
    motherId: "b8f95465-6bbf-40a0-9e3d-5b028b8759e5",
    spouseId: "9d646cb1-0000-411b-8eec-16d1370bdee9",
    birthDate: "1960-01-01",
    generation: 5,
    relationToBanishwor: "Paternal Uncle (Khura)"
  },
  {
    id: "9d646cb1-0000-411b-8eec-16d1370bdee9",
    firstName: "Ngambi",
    lastName: "Athokpam",
    gender: "F",
    spouseId: "b7748ccb-13e9-461d-9b65-56cca8619c53",
    generation: 5,
    relationToBanishwor: "Paternal Aunt (Ene)"
  },
  {
    id: "3311a343-4382-4f90-b631-c0874b50629c",
    firstName: "Athokpamcha",
    lastName: "Sharat",
    gender: "M",
    fatherId: "11bdaa40-dd32-46e0-be5b-7b03e4778b69",
    motherId: "b8f95465-6bbf-40a0-9e3d-5b028b8759e5",
    spouseId: "e7bcf46f-a9ce-47e4-8c8c-a2af82fe9b6e",
    birthDate: "1962-01-01",
    generation: 5,
    relationToBanishwor: "Paternal Uncle (Khura)"
  },
  {
    id: "e7bcf46f-a9ce-47e4-8c8c-a2af82fe9b6e",
    firstName: "Dimen",
    lastName: "Athokpam",
    gender: "F",
    spouseId: "3311a343-4382-4f90-b631-c0874b50629c",
    generation: 5,
    relationToBanishwor: "Paternal Aunt (Ene)"
  },
  {
    id: "e619d95b-1d48-4bfa-8f72-fe1a268c60af",
    firstName: "Athokpamcha",
    middleName: "Chanu",
    lastName: "Tamphasana",
    gender: "F",
    fatherId: "11bdaa40-dd32-46e0-be5b-7b03e4778b69",
    motherId: "b8f95465-6bbf-40a0-9e3d-5b028b8759e5",
    birthDate: "1965-01-01",
    generation: 5,
    relationToBanishwor: "Paternal Aunt (Iche / Ene)"
  },

  // ================= GENERATION 6: THE FOCUS TIER =================
  {
    id: "b0188c5f-41be-4212-b83f-41d9f30b1638",
    firstName: "Banishwor",
    lastName: "Athokpamcha",
    gender: "M",
    fatherId: "019ac88e-984e-46b2-a273-f739b80c0546",
    motherId: "fe01ce14-a712-42a1-a029-aff99d3035a9",
    birthDate: "1997-12-04",
    occupation: "Software Engineer & Programmer",
    education: "M.C.A. (7th State Rank, Manipur University)",
    address: "Athokpam Mayai Leikai, Thoubal, Manipur",
    generation: 6,
    isDirectAncestor: false,
    isSubject: true,
    relationToBanishwor: "You (Subject of the Lineage)",
    photoUrl: "https://drive.google.com/uc?export=view&id=1IocUnQngu8UWb9igPonVYgCAxPug2Jhe",
    bio: "Software developer, author, 7th Rank MCA graduate, and digital preserver of Meitei cultural heritage. Architect of BANI // OS and the Athokpam Family Tree portal."
  },
  {
    id: "528989ea-51fb-4df4-bdf7-c3397e9e0801",
    firstName: "Banikanta",
    lastName: "Athokpamcha",
    gender: "M",
    fatherId: "019ac88e-984e-46b2-a273-f739b80c0546",
    motherId: "fe01ce14-a712-42a1-a029-aff99d3035a9",
    spouseId: "f63316a0-31be-49a1-ab17-98a8287655fd",
    birthDate: "1994-06-09",
    education: "B.A.",
    address: "Athokpam Mayai Leikai",
    generation: 6,
    relationToBanishwor: "Elder Brother (Tada)",
    photoUrl: "https://drive.google.com/uc?export=view&id=18ZXa2J5tcBYf7AITWkxm6Or53pvrF-qm",
    bio: "Elder brother of Banishwor, married to Silky."
  },
  {
    id: "f63316a0-31be-49a1-ab17-98a8287655fd",
    firstName: "Kshetrimayum",
    middleName: "Chanu",
    lastName: "Silky",
    gender: "F",
    spouseId: "528989ea-51fb-4df4-bdf7-c3397e9e0801",
    generation: 6,
    relationToBanishwor: "Sister-in-law (Mou)"
  },
  {
    id: "123b587b-1b11-404f-b2dc-0ed2406cc358",
    firstName: "Bishwal",
    lastName: "Athokpamcha",
    gender: "M",
    fatherId: "019ac88e-984e-46b2-a273-f739b80c0546",
    motherId: "fe01ce14-a712-42a1-a029-aff99d3035a9",
    birthDate: "2003-06-15",
    address: "Athokpam Mayai Leikai",
    generation: 6,
    relationToBanishwor: "Younger Brother (Inao)",
    photoUrl: "https://drive.google.com/uc?export=view&id=1HMY3qOg3bdA4ZCrO1kp-sMf9Cj8ttdOX",
    bio: "Youngest brother of Banishwor."
  },

  // ================= COUSINS (COLLATERAL GENERATION 6) =================
  {
    id: "b66e55cc-9c13-40b7-bdd3-cab474772b84",
    firstName: "Mithun",
    lastName: "Athokpam",
    gender: "M",
    fatherId: "87d69f91-17e5-4b48-82b2-6e5f9ca4b5da",
    motherId: "59566712-7cb8-46a8-b569-9c242784d951",
    spouseId: "b39e3449-939d-406b-9623-fcc993823f6d",
    occupation: "IRB",
    generation: 6,
    relationToBanishwor: "First Cousin (Priyokumar Branch)"
  },
  {
    id: "b39e3449-939d-406b-9623-fcc993823f6d",
    firstName: "Anjali",
    lastName: "Athokpam",
    gender: "F",
    spouseId: "b66e55cc-9c13-40b7-bdd3-cab474772b84",
    generation: 6,
    relationToBanishwor: "Cousin-in-law"
  },
  {
    id: "bdcfa161-265f-4627-83b4-39a7dcd94586",
    firstName: "Ranjita",
    lastName: "Athokpam",
    gender: "F",
    fatherId: "87d69f91-17e5-4b48-82b2-6e5f9ca4b5da",
    motherId: "59566712-7cb8-46a8-b569-9c242784d951",
    generation: 6,
    relationToBanishwor: "First Cousin (Priyokumar Branch)"
  },
  {
    id: "41da7efd-f578-41e8-86cb-4a1b16194ee0",
    firstName: "Luxmi",
    lastName: "Athokpam",
    gender: "F",
    fatherId: "87d69f91-17e5-4b48-82b2-6e5f9ca4b5da",
    motherId: "59566712-7cb8-46a8-b569-9c242784d951",
    generation: 6,
    relationToBanishwor: "First Cousin (Priyokumar Branch)"
  },
  {
    id: "80b60f27-90d5-42d4-b1e2-edc50a6e2641",
    firstName: "Ibecha",
    lastName: "Athokpam",
    gender: "F",
    fatherId: "87d69f91-17e5-4b48-82b2-6e5f9ca4b5da",
    motherId: "59566712-7cb8-46a8-b569-9c242784d951",
    generation: 6,
    relationToBanishwor: "First Cousin (Priyokumar Branch)"
  },
  {
    id: "aa03b7e5-4c8f-4892-9f7e-b1057b6ff62c",
    firstName: "Chaoba",
    lastName: "Athokpam",
    gender: "F",
    fatherId: "2d5051c0-dbc6-40d1-acb2-49227463a193",
    motherId: "2960d77d-3658-486a-9ef1-a388000aa1f0",
    generation: 6,
    relationToBanishwor: "First Cousin (Radhamani Branch)"
  },
  {
    id: "7d79ab0e-a3ed-4048-b4fb-809cad747853",
    firstName: "Omita",
    lastName: "Athokpam",
    gender: "F",
    fatherId: "2d5051c0-dbc6-40d1-acb2-49227463a193",
    motherId: "2960d77d-3658-486a-9ef1-a388000aa1f0",
    generation: 6,
    relationToBanishwor: "First Cousin (Radhamani Branch)"
  },
  {
    id: "c16821bb-52ad-4344-b945-c5804d3b64fc",
    firstName: "Omila",
    lastName: "Athokpam",
    gender: "F",
    fatherId: "2d5051c0-dbc6-40d1-acb2-49227463a193",
    motherId: "2960d77d-3658-486a-9ef1-a388000aa1f0",
    generation: 6,
    relationToBanishwor: "First Cousin (Radhamani Branch)"
  },
  {
    id: "58a7d1b0-b8bb-4b27-9460-5f88ddc29481",
    firstName: "Ashalata",
    lastName: "Athokpam",
    gender: "F",
    fatherId: "2d5051c0-dbc6-40d1-acb2-49227463a193",
    motherId: "2960d77d-3658-486a-9ef1-a388000aa1f0",
    generation: 6,
    relationToBanishwor: "First Cousin (Radhamani Branch)"
  },
  {
    id: "342e7727-c0a1-454f-86b4-b8a6e8e3be64",
    firstName: "Gojendro",
    lastName: "Athokpam",
    gender: "M",
    fatherId: "2d5051c0-dbc6-40d1-acb2-49227463a193",
    motherId: "2960d77d-3658-486a-9ef1-a388000aa1f0",
    spouseId: "8db2cf1e-76c8-478a-b567-604fb28b4ae0",
    birthDate: "1989-09-10",
    generation: 6,
    relationToBanishwor: "First Cousin (Radhamani Branch)",
    photoUrl: "https://drive.google.com/uc?export=view&id=1FAse232HriOr0v9UwA-vcIq-irbmTg8J"
  },
  {
    id: "8db2cf1e-76c8-478a-b567-604fb28b4ae0",
    firstName: "Promila",
    lastName: "Athokpam",
    gender: "F",
    spouseId: "342e7727-c0a1-454f-86b4-b8a6e8e3be64",
    generation: 6,
    relationToBanishwor: "Cousin-in-law"
  },
  {
    id: "e3c8b31d-0b94-498a-a4f1-8d31d3c9c811",
    firstName: "Jobistra",
    lastName: "Athokpam",
    gender: "M",
    fatherId: "b7748ccb-13e9-461d-9b65-56cca8619c53",
    motherId: "9d646cb1-0000-411b-8eec-16d1370bdee9",
    spouseId: "51870847-39ee-496a-82f1-d12291fd0643",
    generation: 6,
    relationToBanishwor: "First Cousin (Indubhusan Branch)",
    photoUrl: "https://drive.google.com/uc?export=view&id=1w6vyeNYoUas3MKHwcC-vTAFsw4lHAT3c"
  },
  {
    id: "51870847-39ee-496a-82f1-d12291fd0643",
    firstName: "Romita",
    lastName: "Athokpam",
    gender: "F",
    spouseId: "e3c8b31d-0b94-498a-a4f1-8d31d3c9c811",
    birthDate: "1997-02-01",
    generation: 6,
    relationToBanishwor: "Cousin-in-law",
    photoUrl: "https://drive.google.com/uc?export=view&id=1rgAgqUpaRLbgl9H29xzyPnh7hIGUbyxD"
  },
  {
    id: "2dda48eb-da8c-45a9-a305-24f1c30bd37e",
    firstName: "Bandana",
    lastName: "Athokpam",
    gender: "F",
    fatherId: "b7748ccb-13e9-461d-9b65-56cca8619c53",
    motherId: "9d646cb1-0000-411b-8eec-16d1370bdee9",
    generation: 6,
    relationToBanishwor: "First Cousin (Indubhusan Branch)"
  },
  {
    id: "6a2adae0-1c7a-4843-a0c9-7b3fb282e2d0",
    firstName: "Bandeshwori",
    lastName: "Athokpam",
    gender: "F",
    fatherId: "b7748ccb-13e9-461d-9b65-56cca8619c53",
    motherId: "9d646cb1-0000-411b-8eec-16d1370bdee9",
    generation: 6,
    relationToBanishwor: "First Cousin (Indubhusan Branch)"
  },
  {
    id: "4d302232-aa21-48f2-a9b7-a422156dcc3d",
    firstName: "Reteshwori",
    lastName: "Athokpam",
    gender: "F",
    fatherId: "b7748ccb-13e9-461d-9b65-56cca8619c53",
    motherId: "9d646cb1-0000-411b-8eec-16d1370bdee9",
    generation: 6,
    relationToBanishwor: "First Cousin (Indubhusan Branch)"
  },
  {
    id: "d569b547-c785-412e-8b0f-2609e6167df3",
    firstName: "Johnson",
    lastName: "Athokpam",
    gender: "M",
    fatherId: "3311a343-4382-4f90-b631-c0874b50629c",
    motherId: "e7bcf46f-a9ce-47e4-8c8c-a2af82fe9b6e",
    occupation: "LDC",
    generation: 6,
    relationToBanishwor: "First Cousin (Sharat Branch)",
    photoUrl: "https://drive.google.com/uc?export=view&id=1jX9yL_4FprkEkFibkU0v03SUBvkHu7-U"
  },
  {
    id: "a6e18a8f-e25d-4a02-a7c2-53c198ad2556",
    firstName: "Joykumar",
    lastName: "Athokpam",
    gender: "M",
    fatherId: "3311a343-4382-4f90-b631-c0874b50629c",
    motherId: "e7bcf46f-a9ce-47e4-8c8c-a2af82fe9b6e",
    generation: 6,
    relationToBanishwor: "First Cousin (Sharat Branch)"
  },
  {
    id: "8a29b24c-7a14-44bf-bd68-3d95fc0305cb",
    firstName: "Joymati",
    lastName: "Athokpam",
    gender: "F",
    fatherId: "3311a343-4382-4f90-b631-c0874b50629c",
    motherId: "e7bcf46f-a9ce-47e4-8c8c-a2af82fe9b6e",
    generation: 6,
    relationToBanishwor: "First Cousin (Sharat Branch)"
  },

  // ================= GENERATION 7: NEXT GENERATION =================
  {
    id: "0b2c6877-ba25-4167-af87-0c6d06d9da60",
    firstName: "Athoiba",
    lastName: "Athokpam",
    gender: "M",
    fatherId: "342e7727-c0a1-454f-86b4-b8a6e8e3be64",
    motherId: "8db2cf1e-76c8-478a-b567-604fb28b4ae0",
    generation: 7,
    relationToBanishwor: "Nephew (Son of Gojendro)"
  },
  {
    id: "c185bb78-01f9-4bec-b894-1c46769a6c68",
    firstName: "Lamjingbi",
    lastName: "Athokpam",
    gender: "F",
    fatherId: "e3c8b31d-0b94-498a-a4f1-8d31d3c9c811",
    motherId: "51870847-39ee-496a-82f1-d12291fd0643",
    generation: 7,
    relationToBanishwor: "Niece (Daughter of Jobistra)"
  },
  {
    id: "1bd3e2a5-426c-440b-94d6-234bdbc6793b",
    firstName: "Lansana",
    lastName: "Athokpam",
    gender: "F",
    fatherId: "e3c8b31d-0b94-498a-a4f1-8d31d3c9c811",
    motherId: "51870847-39ee-496a-82f1-d12291fd0643",
    birthDate: "2026-07-20",
    generation: 7,
    relationToBanishwor: "Niece (Daughter of Jobistra)"
  }
];

export interface GenerationalSpineTier {
  generation: 1 | 2 | 3 | 4 | 5 | 6;
  tierTitle: string;
  tierSub: string;
  era: string;
  primaryAncestor: AthokpamMember;
  spouse?: AthokpamMember;
  siblings?: AthokpamMember[];
  collateralBranchesCount?: number;
}

export const directLineageSpine: GenerationalSpineTier[] = [
  {
    generation: 1,
    tierTitle: "The Ancient Roots",
    tierSub: "ꯍꯧꯔꯛꯐꯝ ꯃꯔꯨ // GENERATION I",
    era: "19th Century",
    primaryAncestor: athokpamFamilyMembers.find(m => m.id === "67d85ca0-7224-40eb-b4bc-cc93a0ef321b")!,
    spouse: athokpamFamilyMembers.find(m => m.id === "da98a412-863c-4a91-9577-536d778428e0")!,
    siblings: []
  },
  {
    generation: 2,
    tierTitle: "The Lineage Bearer",
    tierSub: "꯲ꯁꯨꯕ ꯃꯤꯔꯣꯜ // GENERATION II",
    era: "Late 19th Century",
    primaryAncestor: athokpamFamilyMembers.find(m => m.id === "ceb83b61-35ec-43d8-993e-211f06054a51")!,
    spouse: athokpamFamilyMembers.find(m => m.id === "f38ac771-75d2-4099-bd95-17e441c9ba6a")!,
    siblings: []
  },
  {
    generation: 3,
    tierTitle: "The Settlement Foundation",
    tierSub: "꯳ꯁꯨꯕ ꯃꯤꯔꯣꯜ // GENERATION III",
    era: "Early 20th Century",
    primaryAncestor: athokpamFamilyMembers.find(m => m.id === "6f37e528-1bb4-4739-9c37-f656292dd13d")!,
    spouse: athokpamFamilyMembers.find(m => m.id === "f74e238c-5f56-40ce-8b01-e59be4b97cc2")!,
    siblings: [
      athokpamFamilyMembers.find(m => m.id === "ab2d84c3-8780-4b41-9793-3c34ce042a27")!
    ].filter(Boolean)
  },
  {
    generation: 4,
    tierTitle: "The Educator Patriarch",
    tierSub: "꯴ꯁꯨꯕ ꯃꯤꯔꯣꯜ // GENERATION IV",
    era: "Mid 20th Century",
    primaryAncestor: athokpamFamilyMembers.find(m => m.id === "11bdaa40-dd32-46e0-be5b-7b03e4778b69")!,
    spouse: athokpamFamilyMembers.find(m => m.id === "b8f95465-6bbf-40a0-9e3d-5b028b8759e5")!,
    siblings: [
      athokpamFamilyMembers.find(m => m.id === "e131e7ac-b69f-4172-b593-175e36d63a2a")!,
      athokpamFamilyMembers.find(m => m.id === "8532774e-52bd-45e1-bc02-49f0044e0f73")!,
      athokpamFamilyMembers.find(m => m.id === "21da1750-a8dd-4051-9ab0-0a3e07ff33af")!
    ].filter(Boolean)
  },
  {
    generation: 5,
    tierTitle: "The Parents & Guardians",
    tierSub: "꯵ꯁꯨꯕ ꯃꯤꯔꯣꯜ // GENERATION V",
    era: "1967 – Present",
    primaryAncestor: athokpamFamilyMembers.find(m => m.id === "019ac88e-984e-46b2-a273-f739b80c0546")!,
    spouse: athokpamFamilyMembers.find(m => m.id === "fe01ce14-a712-42a1-a029-aff99d3035a9")!,
    siblings: [
      athokpamFamilyMembers.find(m => m.id === "87d69f91-17e5-4b48-82b2-6e5f9ca4b5da")!,
      athokpamFamilyMembers.find(m => m.id === "2d5051c0-dbc6-40d1-acb2-49227463a193")!,
      athokpamFamilyMembers.find(m => m.id === "b7748ccb-13e9-461d-9b65-56cca8619c53")!,
      athokpamFamilyMembers.find(m => m.id === "3311a343-4382-4f90-b631-c0874b50629c")!,
      athokpamFamilyMembers.find(m => m.id === "e619d95b-1d48-4bfa-8f72-fe1a268c60af")!
    ].filter(Boolean),
    collateralBranchesCount: 5
  },
  {
    generation: 6,
    tierTitle: "The Modern Custodian & Subject",
    tierSub: "꯶ꯁꯨꯕ ꯃꯤꯔꯣꯜ // GENERATION VI · THE FOCUS",
    era: "1997 – Present",
    primaryAncestor: athokpamFamilyMembers.find(m => m.id === "b0188c5f-41be-4212-b83f-41d9f30b1638")!,
    siblings: [
      athokpamFamilyMembers.find(m => m.id === "528989ea-51fb-4df4-bdf7-c3397e9e0801")!,
      athokpamFamilyMembers.find(m => m.id === "123b587b-1b11-404f-b2dc-0ed2406cc358")!
    ].filter(Boolean)
  }
];
