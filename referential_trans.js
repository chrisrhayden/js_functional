const Immutable = require('immutable')


const decrementHP = (player) => player.set('hp', player.get('hp') - 1)

const isSameTeam = (player1, player2) => {
  return player1.get('team') === player2.get('team')
}

const punch = (player, target) => {
  return target.set('hp', target.get('hp') -1)
}

const jobe = Immutable.Map({
  name: 'jobe',
  hp: 20,
  team: 'red'
})

const michael = Immutable.Map({
  name: 'Michael',
  hp: 20,
  team: 'green'
})

// eslint-disable-next-line no-console
console.log(punch(jobe, michael))
