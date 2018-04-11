// 帮助中心
const Component = resolve => {
    require.ensure([], () => {
        resolve(require('components/Near.vue'));
    }, 'help');
};
const Help = resolve => {
    require.ensure([], () => {
        resolve(require('components/Help.vue'));
    }, 'help');
};
const Scroe = resolve => {
    require.ensure([], () => {
        resolve(require('components/help/Card.vue'));
    }, 'help');
};
const Card = resolve => {
    require.ensure([], () => {
        resolve(require('components/help/Card.vue'));
    }, 'help');
};



export default {
  path: '/help',
  components: {
    default: Component,
  },
  children: [
    {
      name: 'help',
      path: 'main',
      components: {
        default: Help
      }
    },
    {
      name: 'scroe',
      path: 'scroe',
      components: {
        default: Scroe
      }
    },
    {
      name: 'card',
      path: 'card',
      components: {
        default: Card
      }
    }
  ]
}
