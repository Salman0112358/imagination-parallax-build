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