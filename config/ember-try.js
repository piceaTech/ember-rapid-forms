module.exports = {
  scenarios: [
    {
      name: 'default',
      dependencies: { }
    },
    {
      name: 'ember-2.4',
      dependencies: {
        'ember': '2.4.6'
      },
      npm: {
        devDependencies: {
          'ember-data': '2.4.3'
        }
      }
    },
    {
      name: 'ember-2.8',
      dependencies: {
        'ember': '2.8.3'
      },
      npm: {
        devDependencies: {
          'ember-data': '2.8.1'
        }
      }
    },
    {
      name: 'ember-2.9',
      dependencies: {
        'ember': '2.9.0',
      },
      npm: {
        devDependencies: {
          'ember-data': '2.9.0'
        }
      }
    },
    {
      name: 'ember-2.10',
      dependencies: {
        'ember': '2.10.2'
      },
      npm: {
        devDependencies: {
          'ember-data': '2.10.0'
        }
      }
    },
    {
      name: 'ember-2.11',
      dependencies: {
        'ember': '2.11.0',
      },
      npm: {
        devDependencies: {
          'ember-data': '2.11.0'
        }
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
      allowedToFail: true,
      dependencies: {
        'ember': 'components/ember#canary'
      },
      resolutions: {
        'ember': 'canary'
      }
    }
  ]
};
