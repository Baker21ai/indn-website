export interface BoardMember {
  id: string
  name: string
  title: string
  tribe: string
  bio: string
  workExperience: string
  volunteer: string
  imageUrl: string
  order: number
}

export const boardMembers: BoardMember[] = [
  {
    id: 'james-connor',
    name: 'James Whitebear Connor',
    title: 'Security and AI Executive',
    tribe: 'Assiniboine Tribe - Fort Peck Montana',
    bio: 'James Whitebear Connor is a pioneering security and AI executive with decades of leading innovation in risk management and intelligent threat detection. He has held leadership roles at Oracle, Symantec, and now leads Corporate Engagements at Ambient.ai. His security strategies have protected companies like Yahoo, Facebook, and Wells Fargo.',
    workExperience: 'Ambient.ai, Head of Corporate Engagements; N2N Secure Inc., Chief Executive Officer; Symantec, Sr. Manager Global Security Systems; PeopleSoft (Oracle), Sr. Manager Global Technical Security Systems; U.S. Coast Guard, Law Enforcement – Search and Rescue.',
    volunteer: 'RSA Security, Head of Physical Security Technology Track Development; Security Industry Association (SIA), AI Advisory Board Member; Youth Alliance, Board of Directors; Indigenous Nations Diversity Network, Co-Founder; Los Puentecitos / Little Bridges Bilingual Preschool, Co-Founder – Senior Warden.',
    imageUrl: '/images/board/james-connor.jpg',
    order: 1,
  },
  {
    id: 'elvira-robinson',
    name: 'Elvira Zaragoza Robinson',
    title: 'Attorney, Author, and Cultural Organizer',
    tribe: 'Akimel O\'Odham (Pima)',
    bio: 'Elvira Zaragoza Robinson is an attorney, author, and cultural organizer with a lifelong commitment to justice and Indigenous empowerment. She holds a Juris Doctor from Santa Clara University and a Bachelor of Arts from San Jose State University. Elvira\'s work spans criminal law, estate planning, and publishing children\'s books that celebrate Native culture.',
    workExperience: 'Self-Employed, Attorney (Criminal & Estate Planning); County District Attorney\'s Office, Former Prosecutor.',
    volunteer: 'Various Tribal Organizations, Organizer of Leadership Conferences & Cultural Events.',
    imageUrl: '/images/board/elvira-robinson.jpg',
    order: 2,
  },
  {
    id: 'charles-wall',
    name: 'Charles Wall',
    title: 'Director and Educator',
    tribe: 'Muscogee, Kiowa, Azorean, and Irish Descent',
    bio: 'Charles Wall is a seasoned director and educator in American Indian programs, Parks & Recreation, and Social Services. With formal training in JEDI (Justice, Equity, Diversity, Inclusion), he brings decades of experience building inclusive, community-centered initiatives. Charles is a graduate of Concordia University and the UC Davis Graduate School of Management.',
    workExperience: 'Tribal and Municipal Organizations, Parks & Recreation Director; Community-Based Agencies, Social Services Director; American Indian Education Programs, Educator.',
    volunteer: 'Indigenous Youth Outreach Programs, Speaker & Advocate.',
    imageUrl: '/images/board/charles-wall.jpg',
    order: 3,
  },
  {
    id: 'jerry-drino',
    name: 'Fr. Jerry Drino',
    title: 'Episcopal Priest & Theologian',
    tribe: 'Episcopal Priest & Theologian (M.Div., D.D.)',
    bio: 'Fr. Jerry Drino is an Episcopal priest and theologian with over six decades of ministry alongside Indigenous peoples, including the G\'wichin, Lakota, Kanaka Maoli, and Diné. He holds an M.Div. (Master of Divinity) and has been recognized with a D.D. (Doctor of Divinity) for his contributions to Native ministry. He currently serves as Canon Theologian for the Episcopal Church in Navajoland and as a Native Ministry tutor at the Vancouver School of Theology.',
    workExperience: 'Episcopal Church in Navajoland, Canon Theologian; Vancouver School of Theology, Tutor – Native Ministry Program.',
    volunteer: 'St. Philip\'s Church (San Jose), Co-founder – Native Ministry & Sweat Lodge (with Indian Health Center, Santa Clara County).',
    imageUrl: '/images/board/jerry-drino.jpg',
    order: 4,
  },
  {
    id: 'kanyon-sayers-roods',
    name: 'Kanyon "Coyote" Sayers-Roods',
    title: 'Multimedia Artist, Educator, and Tribal Chairwoman',
    tribe: 'Mutsun-Ohlone | Two-Spirit Woman',
    bio: 'Kanyon is a multimedia artist, educator, and truth-teller whose work catalyzes decolonizing dialogue and Indigenous visibility. As Tribal Chairwoman of the Indian Canyon Nation and CEO of Kanyon Konsulting, she leads with a dynamic blend of tradition and innovation, inspiring both cultural revival and systemic change.',
    workExperience: 'Kanyon Konsulting, CEO; Indian Canyon Nation, Tribal Chairwoman.',
    volunteer: 'Indian Canyon Two-Spirit Society, Founder; Costanoan Indian Research, President & Co-Chair; Indian Canyon Mutsun Band of Costanoan Ohlone People, Cultural Representative & Native Monitor.',
    imageUrl: '/images/board/kanyon-sayers-roods.jpg',
    order: 5,
  },
  {
    id: 'bernice-toney',
    name: 'Bernice Cuauhxihuitl Aguilera Toney',
    title: 'Cultural Steward and Program Manager',
    tribe: 'Calpulli Tonalehqueh',
    bio: 'Bernice is a cultural steward, mother of three, and community bridge builder dedicated to equity, healing, and Indigenous knowledge. A member of Calpulli Tonalehqueh, she walks the path of Chicomecoatl (7 Serpent), traveling across the continent to learn from Native teachers and uphold the prayers of the Eagle and Condor. Her life\'s work uplifts youth, families, and cultural traditions through justice-centered systems change.',
    workExperience: 'Santa Clara County District Attorney\'s Office, Program Manager – South County Youth Task Force (SCYTF); City of Gilroy, SCYTF Coordinator; South County HEALs! Initiative (CA ACH Statewide Initiative), Program Lead; Various Nonprofits (Justice, Housing, Empowerment), Director / Program Manager.',
    volunteer: 'Calpulli Tonalehqueh (San Jose, CA), Cultural Steward & Spiritual Healer; Continental Indigenous Gatherings, Cultural Ambassador & Learner.',
    imageUrl: '/images/board/bernice-toney.jpg',
    order: 6,
  },
]
