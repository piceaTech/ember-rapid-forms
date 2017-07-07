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
          'ember-data': '2.11.3'
        }
      }
    },
    {
      name: 'ember-2.12',
      dependencies: {
        'ember': '2.12.0',
      },
      npm: {
        devDependencies: {
          'ember-data': '2.12.2'
        }
      }
    },
    {
      name: 'ember-2.13',
      dependencies: {
        'ember': '2.13.0',
      },
      npm: {
        devDependencies: {
          'ember-data': '2.13.2'
        }
      }
    },
    {
      name: 'ember-release',
      dependencies: {
        'ember': 'components/ember#release'
      },
      npm: {
        devDependencies: {
          'ember-data': '2.14.2'
        }
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
      npm: {
        devDependencies: {
          'ember-data': '2.15.0-beta.1'
        }
      },
      resolutions: {
        'ember': 'beta'
      }
    }
  ]
};
