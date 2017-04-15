import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Email } from 'meteor/email';
export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
    
  Meteor.startup( function() {
      process.env.MAIL_URL = "smtp://noreply@techiepulse.com:micron123@server511.webhostingpad.com:465";
//
//      Email.send({
//         to: "vdhutia18@gmail.com",
//         from: "noreply@booking.thaiembassyuk.org.uk",
//         subject: "Royal Thai Embassy Booking Confirmation",
//         text: "The email content..."
//      });
//
   });

    
    Meteor.methods({
    sendEmail: function (to, text) {
        check([to, text], [String]);
        
        SSR.compileTemplate('htmlEmail', Assets.getText('html-email.html'));
        
        var emailData = {
              name: "Vivek",
              favoriteRestaurant: "Honker Burger",
              bestFriend: "Skeeter Valentine",
            };

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        Email.send({
            to: "vivek.dhutia@my.westminster.ac.uk",
            from: 'Techie Pulse <noreply@techiepulse.com>',
            subject: "Techie Pulse Week-In Review",
            html: SSR.render('htmlEmail', emailData),
        });
    }
});
}

Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'tasks.remove'(taskId) {
    check(taskId, String);

    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Tasks.remove(taskId);
  },
  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
  'tasks.setPrivate'(taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Tasks.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, { $set: { private: setToPrivate } });
  },
});
