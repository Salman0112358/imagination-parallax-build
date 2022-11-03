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

  image : {
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

}

export interface IPrompt {
  id : number;
  inserted_at : string;
  prompt : string;
  render_image : string;
  user_id : string;
}