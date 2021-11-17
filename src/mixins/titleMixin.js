const fixedText = "She'sTech Conference 2021";

function getTitle(vm) {
  const { title } = vm.$options;
  if (title) {
    const customText = typeof title === 'function'
      ? title.call(vm)
      : title;

    return `${customText} | ${fixedText}`;
  }

  return fixedText;
}
export default {
  created() {
    const title = getTitle(this);
    if (title) {
      document.title = title;
    }
  },
  methods: {
    updateTitle(title) {
      if (title) document.title = `${title} | ${fixedText}`;
    },
  },
};
