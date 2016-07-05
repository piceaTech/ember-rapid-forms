module.exports = {
  scenarios: [
    {
      name: 'default',
      dependencies: { }
    },
    {
      name: 'ember-2.0',
      dependencies: {
        'ember': '2.0.3',
      }
    },
    {
      name: 'ember-2.1',
      dependencies: {
        'ember': '2.1.2',
      }
    },
    {
      name: 'ember-2.2',
      dependencies: {
        'ember': '2.2.2',
      }
    },
    {
      name: 'ember-2.3',
      dependencies: {
        'ember': '2.3.2',
      }
    },
    {
      name: 'ember-2.4',
      dependencies: {
        'ember': '2.4.6',
      }
    },
    {
      name: 'ember-2.5',
      dependencies: {
        'ember': '2.5.1',
      }
    },
    {
      name: 'ember-2.1',
      dependencies: {
        'ember': '2.1.1',
      }
    },
    {
      name: 'ember-release',
      dependencies: {
        'ember': 'components/ember#release'
      },
      resolutions: {
        'ember': 'release'
      }
    },
    {
      name: 'ember-beta',
      dependencies: {
        'ember': 'components/ember#beta'
      },
      resolutions: {
        'ember': 'beta'
      }
    },
    {
      name: 'ember-canary',
      dependencies: {
        'ember': 'components/ember#canary'
      },
      resolutions: {
        'ember': 'canary'
      }
    }
  ]
};
