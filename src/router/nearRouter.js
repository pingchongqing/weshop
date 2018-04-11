const Near = resolve => {
    require.ensure([], () => {
        resolve(require('components/Near.vue'));
    }, 'near');
};

const NearList = resolve => {
    require.ensure([], () => {
        resolve(require('components/near/List.vue'));
    }, 'near');
};
const CabProducts = resolve => {
    require.ensure([], () => {
        resolve(require('components/near/CabProducts.vue'));
    }, 'near');
};

export default {
  path: '/near',
  components: {
    default: Near,
  },
  children: [
    {
      name: 'nearlist',
      path: 'list',
      components: {
        default: NearList
      }
    },
    {
      name: 'cabproducts',
      path: 'cabproducts/:cabinetId',
      components: {
        default: CabProducts
      }
    },
  ]
}
