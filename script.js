new Vue({
    el: '#app',
    data: {
        history: [],
        converter: new showdown.Converter(),
        dotPicture: "",
        input: '',
        prevCount: 0,
        commands: {
            clear: {
                description: 'Clear the terminal screen',
                exec() {
                    this.history = [];
                }
            },
            help: {
                description: 'Show available commands',
                exec() {
                    return Object.keys(this.commands).map(cmd => `${cmd} - ${this.commands[cmd].description}`).join('<br>');
                }
            },
            "hello world": {
                description: 'Hello world!',
                value: "Hello World!",
            },
            instagram: {
                description: "Instagram profile",
                markdown: "instagram",
            },
            github: {
                description: "GitHub profile",
                markdown: "github",
            },
            about: {
                description: "About me",
                markdown: "about",
            },
            position: {
                description: "Position in which I am currently working",
                value: "Senior Software Engineer",
            },
            experience: {
                description: "My current experience",
                value: "3+",
            },
            languages: {
                description: "Known Languages",
                markdown: "languages",
            }
        }
    },
    methods: {
        executeCommand() {
            const cmd = this.input.trim();
            if (cmd === '') return;

            this.history.push({ type: 'prompt', content: cmd });

            const commandLower = cmd.toLowerCase();

            if (this.commands.hasOwnProperty(commandLower)) {
                const command = this.commands[commandLower];
                let output = null;
                if ("exec" in command)
                    output = command.exec.call(this);
                else if ("template" in command)
                    output = this.renderTemplate(command.template)
                else if ("markdown" in command)
                    output = this.renderMarkdown(command.markdown)
                else
                    output = command.value
                if (output) this.history.push({ type: 'output', content: output });
            } else {
                this.history.push({ type: 'output', content: `Command not found: ${cmd}` });
            }

            this.clearInput();
        },
        previousCommand(){
            const prompts = this.history.filter(h=>h.type === "prompt");
            if (!prompts.length) return;
            const prompt = prompts[prompts.length - this.prevCount - 1];
            if (prompt === undefined) return;
            this.input = prompt.content;
            this.prevCount += 1;
        },
        clearInput(){
            this.input = "";
            this.prevCount = 0;
        },
        renderLink(title, link){
            return `<a href="${link}">${title}</a>`
        },
        renderTemplate(elementId) {
            return document.getElementById(elementId).innerHTML;
        },
        renderMarkdown(elementId){
            return this.converter.makeHtml(document.getElementById(elementId).innerHTML.trim());
        }
    },
    watch: {
        input(val){
            if (val === "") this.prevCount = 0;
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.input.focus();
        });
    },
    async created(){
        const res = await fetch("assets/profile.txt");
        this.dotPicture = await res.text();
    },
    template: "#content",
});
