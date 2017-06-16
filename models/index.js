let Sequelize = require('sequelize');
let db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
})

let Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false,
    // validation: {
    //   isUrl: true
    // }
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  getterMethods: {
    route() {
      return '/wiki/' + this.urlTitle;
    }
  },
  hooks: {
    beforeValidate: function(page) {
      // console.log('page.title: ', page.title);
      if(page.title) {
        page.urlTitle = page.title.replace(/\s/g,  '_').replace(/\W/g,  '');
      } else {
         page.urlTitle = Math.random().toString(36).substring(2, 7);
      }
      // console.log('this.urlTitle: ', this.urlTitle);
    }
  }
})

let User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

module.exports =  {
  db: db,
  Page: Page,
  User: User
}
