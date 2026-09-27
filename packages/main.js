// rebase - main.js
import { processIncludes } from "./include/index.js";
import getConfig from "./core/config.js";

const rebase = {
  include: {
    load: async () => {
      if (await getConfig("include", false) === false) return;
      await processIncludes();
    }
  }
};

export default rebase;
