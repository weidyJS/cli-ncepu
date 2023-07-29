class Command{
  constructor(instance) {
    if (!instance) {
      throw new Error('command instance must not be null');
    }
    this.program = instance;
    const cmd = this.program.command(this.command);
    cmd.description(this.description);
    cmd.hook('preAction', () => {
      this.preAction && this.preAction();
    });
    cmd.hook('postAction', () => {
      this.postAction && this.postAction();
    });
    if (this.options?.length > 0) { 
      this.options.forEach(option => {
        cmd.option(...option)
        // cmd.option(option.flags, option.description, option.defaultValue);
      });
    }
    cmd.action((...params) => {
      this.action(params);
    });
  }

  get command() {
    throw new Error('command must be implemented');
  }

  get description() {
    throw new Error('description must be implemented');
  }

  get options() {
    return [];
  }

  get action() {
    throw new Error('action must be implemented');
  }

  preAction() {
    //empty
  }

  postAction() {
    // empty
  }
}

export default Command;
