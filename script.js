const displayText = 'Coming soon!';

const outputEl = document.querySelector('#textoutput');
const cursor = document.querySelector('#cursor')

const TYPE_INTERVAL = 200;
const WAIT_INTERVAL = 2000;
const CURSOR_INTERVAL = 500;
var forward = true;

function typer() {
    var text = outputEl.textContent;
    setTimeout(() => {
        if (forward) {
            text = outputEl.textContent += displayText[text.length];
        } else {
            text = outputEl.textContent = text.slice(0, text.length - 1);
        }
        if (text.length == displayText.length || text.length == 0) {
            forward = !forward;
        }
        typer();
    }, (text.length == displayText.length || text.length == 0) ? WAIT_INTERVAL : TYPE_INTERVAL);
}

setInterval(() => {
    cursor.classList.toggle('hide');
}, CURSOR_INTERVAL);

typer();