export interface DbProject {
  id:          string;
  order_index: number;
  category:    'professionnel' | 'personnel' | 'académique';
  title:       string;
  company:     string | null;
  stack:       string[];
  description: string;
  image_url:   string | null;
  video_url:   string | null;
  github_link: string | null;
  demo_link:   string | null;
  axes:        ('cadrage' | 'développement' | 'qualité')[];
  gradient:    string;
  context:     string;
  what_i_did:  string[];
  learned:     string;
  created_at:  string;
  updated_at:  string;
}

export interface DbSkillCategory {
  id:          string;
  order_index: number;
  label:       string;
  skills:      string[];
  badge_cls:   string;
  head_cls:    string;
  created_at:  string;
}

export interface DbExperience {
  id:           string;
  order_index:  number;
  type:         'experience' | 'education';
  period:       string;
  is_current:   boolean;
  title:        string;
  organization: string;
  location:     string | null;
  points:       string[];
  tags:         string[];
  created_at:   string;
}
