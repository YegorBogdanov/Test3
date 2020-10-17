const element = document.getElementById('container');
const fragment = document.createDocumentFragment();
const currentTime = Date.now();
const programs = [
  {
    title: 'example1',
    channel: 'example1',
    startedAt: new Date('2020-10-17T14:00:00'),
    endsAt: new Date('2020-10-17T15:50:00'),
    isOnline: true,
  },
  {
    title: 'example2',
    channel: 'example2',
    startedAt: new Date('2020-10-17T16:00:00'),
    endsAt: new Date('2020-10-17T16:40:00'),
    isOnline: true,
  },
  {
    title: 'example3',
    channel: 'example3',
    startedAt: new Date('2020-10-17T17:00:00'),
    endsAt: new Date('2020-10-17T18:00:00'),
    isOnline: true,
  },
  {
    title: 'example4',
    channel: 'example4',
    startedAt: new Date('2020-10-17T18:00:00'),
    endsAt: new Date('2020-10-17T18:30:00'),
    isOnline: true,
  },
  {
    title: 'example5',
    channel: 'example5',
    startedAt: new Date('2020-10-17T18:35:00'),
    endsAt: new Date('2020-10-17T19:00:00'),
    isOnline: true,
  }
];

programs.forEach(function (program) {
  const div = document.createElement('div');
  div.className = "program";
  const span1 = document.createElement('span');
  const span2 = document.createElement('span');
  const span3 = document.createElement('span');
  const progressContainer = document.createElement('div');
  progressContainer.className = 'progress';
  const progress = document.createElement('progress');
  progress.value = `${(currentTime - program.startedAt) / (program.endsAt - program.startedAt)}`;
  span1.textContent = `${program.startedAt.getHours()}:${program.startedAt.getMinutes() < 10 ? "0" + program.startedAt.getMinutes() : program.startedAt.getMinutes()}`;
  span2.textContent = program.channel;
  span2.className = 'channel';
  span3.textContent = program.title;
  progressContainer.appendChild(progress);
  div.appendChild(span1);
  div.appendChild(span2);
  div.appendChild(span3);
  div.appendChild(progressContainer);
  fragment.appendChild(div);
});

element.appendChild(fragment);