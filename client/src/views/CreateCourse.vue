<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-layout justify-center>
        <v-flex xs12 sm10 md8 lg6>
            <br>
            <v-flex>
                <HeaderTitle title="create Course"></HeaderTitle>
            </v-flex>
            <v-form ref="form">
                <v-card>
                    <v-card-text>
                        <v-text-field
                                ref="title"
                                v-model="title"
                                label="Title"
                                placeholder="ex. Datastructures"
                                :rules="titleRules"
                                required
                        ></v-text-field>
                        <v-text-field
                                ref="description"
                                v-model="description"
                                label="Description"
                                placeholder="ex. About the structures of data"
                        ></v-text-field>
                    </v-card-text>
                    <v-divider class="mt-5"></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" flat @click="send()">Send</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
            <ResponseDialog ref="responseDialog"/>
        </v-flex>
    </v-layout>
</template>

<script>
    import axios from "axios";
    import HeaderTitle from "@/components/HeaderTitle.vue";
    import ResponseDialog from "@/components/ResponseDialog";

    export default {
        data: () => ({
            title: "",
            titleRules: [
                v => !!v || "Title is required",
                v => (v && v.length <= 255) || "Title must be less than 255 characters"
            ],
            description: "",
            descriptionRules: [
                v => !!v || "Description is required",
                v => (v && v.length <= 255) || "Description must be less than 255 characters"
            ]
        }),
        components: {
            HeaderTitle,
            ResponseDialog
        },
        methods: {
            send() {
                if (this.$refs.form.validate()) {
                    axios
                        .post(
                            "http://localhost:3000/api/Course",
                            {
                                title: this.title,
                                description: this.description,
                                inviteCode: this.generateInviteCode(this.title)
                            }
                        )
                        .then(response => {
                            if (response.status == 200) {
                                this.openResponseDialog(response.status);
                            }
                        })
                        .catch(error => {
                            if (error.response.status == 400) {
                                this.openResponseDialog(error.response.status);
                            }
                        });
                }
            },
            openResponseDialog(responseStatus) {
                if (responseStatus == 200) {
                    this.$refs.responseDialog.open("New course has been created", "done");
                } else if (responseStatus == 400) {
                    this.$refs.responseDialog.open(
                        "New Course could not be created",
                        "clear"
                    );
                }
            },
            generateInviteCode(title) {
                var matches = title.match(/\b(\w)/g); //Matches first letter of each word.
                console.log("Length: " + matches.length);
                if (matches.length <= 1) { //1 Letter is not really enough to make the code consistently unique
                    title = title.substring(0, 3); //Get the first 3 letters from the title
                    console.log("In if: " + title);
                } else {
                    title = matches.join(''); //Join the letters together
                    console.log("In else: " + title);
                }
                return new Date().getFullYear() + "_" + title + Math.floor(Math.random() * 101);
            }
        }
    };
</script>
