export interface LexicaImage {
  id: string;
  gallery: string;
  src: string;
  srcSmall: string;
  prompt: string;
  width: number;
  height: number;
  seed: string;
  grid: boolean;
  model: string;
  guidance: number;
  promptid: string;
  nsfw: boolean;
}

export interface LexicaImageArray {
  data: LexicaImage[];
}

export interface singleImage {
  image: {
    id: string;
    gallery: string;
    src: string;
    srcSmall: string;
    prompt: string;
    width: number;
    height: number;
    seed: string;
    grid: boolean;
    model: string;
    guidance: number;
    promptid: string;
    nsfw: boolean;
  };
}

export interface sourceImage {
  image: string;
}

export interface IPrompt {
  id: number;
  user_id: string;
  prompt: string;
  render_image: string;
  inserted_at: string;
  username: string;
  natural_width: number;
  natural_height: number;
  guidance_scale: number;
  sampling_method: string;
  kudos: number;
}
export interface IUserProfile {
  id: string;
  updated_at: string;
  username: string;
  full_name: string;
  avatar_url: string;
  website: string;
  submissions: number;
}
