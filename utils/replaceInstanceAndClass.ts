const replaceInstanceAndClass = (
  prompt: string,
  userInstance: string,
  userClass: string
): string => {

  

  return prompt.replace("{CLASS_PROMPT}", userClass).replace("{INSTANCE_PROMPT}", userInstance)
};

export default replaceInstanceAndClass;
