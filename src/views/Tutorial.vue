<template>
  <div v-if="currentTutorial" class="edit-form">
    <h4>Tutorial</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" v-model="currentTutorial.title" />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description" v-model="currentTutorial.description" />
      </div>
      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentTutorial.published ? "Published" : "Pending" }}
      </div>
    </form>

    <Button label="Unpublish" class=" p-button-sm p-button-raised" v-if="currentTutorial.published" @click="updatePublished(false)" />

    <Button label="Publish" class="p-button-sm p-button-raised" v-else @click="updatePublished(true)" />

    <Button label="Delete" class="p-button-sm p-button-raised p-button-danger" @click="deleteTutorial" />

    <Button label="Submit" class="p-button-sm p-button-raised p-button-success" @click="updateTutorial" />

    <p>{{ message }}</p>

  </div>
  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>
<script>
  import TutorialDataService from "../services/TutorialDataService";
  export default {
    name: "tutorialVue",
    data() {
      return {
        currentTutorial: null,
        message: ''
      };
    },
    methods: {
      getTutorial(id) {
        TutorialDataService.get(id)
          .then(response => {
            this.currentTutorial = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
      updatePublished(status) {
        var data = {
          id: this.currentTutorial.id,
          title: this.currentTutorial.title,
          description: this.currentTutorial.description,
          published: status
        };
        TutorialDataService.update(this.currentTutorial.id, data)
          .then(response => {
            console.log(response.data);
            this.currentTutorial.published = status;
            this.message = 'The status was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
      },
      updateTutorial() {
        TutorialDataService.update(this.currentTutorial.id, this.currentTutorial)
          .then(response => {
            console.log(response.data);
            this.message = 'The tutorial was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
      },
      deleteTutorial() {
        TutorialDataService.delete(this.currentTutorial.id)
          .then(response => {
            console.log(response.data);
            this.$router.push({
              name: "tutorials"
            });
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    mounted() {
      this.message = '';
      this.getTutorial(this.$route.params.id);
    }
  };
</script>
<style lang="scss" scoped>
  .edit-form {
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