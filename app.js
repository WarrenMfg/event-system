const container = document.querySelector('#container');
const frog = document.querySelector('#frog');
const fly = document.querySelector('#fly');


// event system
const eventSystem = target => {
  target.events = {};
  target.on = function(event, callback) {
    this.events[event] = this.events[event] || [];
    this.events[event].push(callback);
  };
  target.trigger = function(event) {
    this.events[event].forEach(fn => fn());
  }
};


// decorate objects
eventSystem(container);
eventSystem(frog);
eventSystem(fly);


// container
container.on('goRight', () => {
  container.style.right = '75%';
});

container.on('goLeft', () => {
  container.style.right = '25%';
});


// frog
frog.on('jump', () => {
  frog.textContent = 'jump';
  frog.style.transform = 'scale(1.75)';
  fly.trigger('flyAway');
  setTimeout(() => {
    frog.trigger('land');
  }, 500);
});

let containerCount = 1;
frog.on('land', () => {
  frog.style.transform = 'scale(1)';
  fly.trigger('annoyFrog');
  
  setTimeout(() => {
      containerCount % 2 === 0 ? container.trigger('goLeft') : container.trigger('goRight');
      containerCount++;
      frog.trigger('jump');
    }, 1500);
});

frog.on('croak', () => {
  frog.textContent = 'croak';
  frog.style.transform = 'rotate(15deg)';
  setTimeout(() => {
    frog.style.transform = 'rotate(0)';
  }, 500);
});


// fly
fly.on('flyAway', () => {
  fly.style.top = '100px';
});

fly.on('annoyFrog', () => {
  fly.style.top = '0px';
  
  setTimeout(() => {
    frog.trigger('croak');    
  }, 500);
});


frog.trigger('land');