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
                v => !!v || "Titel is verplicht",
                v => (v && v.length <= 255) || "Titel moet korter zijn dan 255 karakters"
            ],
            description: ""
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
                                description: this.description
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
            }
        }
    };
</script>
