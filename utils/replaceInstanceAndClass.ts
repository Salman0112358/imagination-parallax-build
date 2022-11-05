const replaceInstanceAndClass = (
  prompt: string,
  userInstance: string,
  userClass: string
): string => {
  if (userInstance && !userClass)
    return prompt.replace("{INSTANCE_PROMPT}", userInstance);

  if (userClass && !userInstance)
    return prompt.replace("{CLASS_PROMPT}", userClass);


  if (userClass && userInstance) return prompt
  .replace("{CLASS_PROMPT}", userClass)
  .replace("{INSTANCE_PROMPT}", userInstance);

  return prompt;

};

export default replaceInstanceAndClass;
