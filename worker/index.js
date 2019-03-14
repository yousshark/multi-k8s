const keys = require('./keys');
const redis = require('redis');

const redisCLient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

const sub = redisCLient.duplicate();

function fib(index){
  if(index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

sub.on('message', (channel, message) => { // anytime a new value shows up in redis
  redisCLient.hset('values', message, fib(parseInt(message))); //hash of 'values', (key) message = index from submit, (value) calcul
})
sub.subscribe('insert');
