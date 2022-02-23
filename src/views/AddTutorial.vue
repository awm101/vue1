<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" required v-model="tutorial.title" name="title" />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input class="form-control" id="description" required v-model="tutorial.description" name="description" />
      </div>
      <Button label="Submit" class="p-button-sm p-button-raised p-button-success" @click="saveTutorial" />
    </div>
    <div v-else>
      <h4>You submitted successfully!</h4>
      <Button label="Add Another" class="p-button-sm p-button-raised p-button-success" @click="newTutorial" />
    </div>
  </div>
</template>
<script>
  import TutorialDataService from "../services/TutorialDataService";
  export default {
    name: "add-tutorial",
    data() {
      return {
        tutorial: {
          id: null,
          title: "",
          description: "",
          published: false
        },
        submitted: false
      };
    },
    methods: {
      saveTutorial() {
        var data = {
          title: this.tutorial.title,
          description: this.tutorial.description
        };
        TutorialDataService.create(data)
          .then(response => {
            this.tutorial.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
      },

      newTutorial() {
        this.submitted = false;
        this.tutorial = {};
      }
    }
  };
</script>
<style lang="scss" scoped>
  .submit-form {
    max-width: 300px;
    margin: auto;
  }
  .p-button {
    margin-right: .5rem;
    font-weight: 600;
}

.p-buttonset {
    .p-button {
        margin-right: 0;
    }
}
.sizes {
    .button {
        margin-bottom: .5rem;
        display: block;

        &:last-child {
            margin-bottom: 0;
        }
    }
}

@media screen and (max-width: 640px) {
    .p-button {
        margin-bottom: .5rem;

        &:not(.p-button-icon-only) {
            display: flex;
            width: 100%;
        }
    }

    .p-buttonset {
        .p-button {
            margin-bottom: 0;
        }
    }
}
</style>