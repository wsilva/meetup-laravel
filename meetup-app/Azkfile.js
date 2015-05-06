/**
 * Documentation: http://docs.azk.io/Azkfile.js
 */

// Adds the systems that shape your system
systems({
  'meetup-app': {
    // Dependent systems
    depends: [
      "redis",
    ],
    // More images:  http://images.azk.io
    // image: {"docker": "azukiapp/php-fpm"},
    image: {"dockerfile": "../containers/web-azk"},
    // Steps to execute before running instances
    provision: [
      // "composer install",
    ],
    workdir: "/azk/#{manifest.dir}",
    shell: "/bin/bash",
    wait: {"retry": 20, "timeout": 1000},
    mounts: {
      '/azk/#{manifest.dir}': path("."),
    },
    scalable: {"default": 2},
    http: {
      domains: [ "#{system.name}.#{azk.default_domain}" ]
    },
    ports: {
      // exports global variables
      http: "80/tcp",
    },
    envs: {
      // set instances variables
      EXAMPLE: "value",
    },
    docker_extra: {
      // extra docker options
      start: {
        Privileged: "true",
      },
    },
  },

  redis: {
    image: { docker: "redis" },
    export_envs: {
      "DATABASE_URL": "redis://#{net.host}:#{net.port[6379]}"
    }
  },

});



