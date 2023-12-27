/**
 * Validate incorrect models in `/models` folder
 *
 * @param {unknown} input
 * @param {unknown} options
 * @param {object} context
 * @param {object} context.path
 * @param {object} context.document
 * @param {object} context.documentInventory
 * @param {object} context.rule
 *
 * @returns {[{message: `Please contact to ${string} to fix this issue.`}]}
 */
const noIncorrectModels = (input, options, context) => {
  if (context.documentInventory.source.includes('/models/')) {
    const contact = context.document.data?.info?.contact || {};
    const author = contact.name ? `${contact.name}<${contact.email}>` : 'author (see commit history)';

    return [
      {
        message: `Свяжитесь с автором - ${author} для исправления ошибки.`,
      },
    ];
  }
};

export default noIncorrectModels;
