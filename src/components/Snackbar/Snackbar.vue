<template>
    <v-snackbar
        v-model="active"
        class="v-application"
        :absolute="absolute"
        :bottom="bottom"
        :color="color"
        :left="left"
        :multi-line="multiLine"
        :right="right"
        :timeout="timeout"
        :top="top"
        :vertical="vertical"
        @click="clickSnackbar"
    >
        {{text}}
        <v-btn
            v-if="!!buttonText"
            :color="buttonColor"
            text
            @click.stop="clickButton"
        >{{buttonText}}</v-btn>
    </v-snackbar>
</template>

<script>
export default {
    props: {
        text: {type: String},
        buttonText: {type: String},
        buttonColor: {type: String, default: 'primary lighten-1'},
        closeOnClick: {type: Boolean, default: false},
        closeOnButtonClick: {type: Boolean, default: true},
        onClick: {type: Function},
        onButtonClick: {type: Function},
        onOpen: {type: Function},
        onClose: {type: Function},

        // 以下是v-snackbar自带的配置
        // https://vuetifyjs.com/zh-Hans/components/snackbars/
        absolute: {type: Boolean, default: false},
        bottom: {type: Boolean, default: false},
        color: {type: String},
        left: {type: Boolean, default: false},
        multiLine: {type: Boolean, default: false},
        right: {type: Boolean, default: false},
        timeout: {type: Number, default: 6000},
        top: {type: Boolean, default: false},
        vertical: {type: Boolean, default: false},
    },
    data() {
        return {
            active: false,
        }
    },
    watch: {
        active(newval) {
            this.$emit('activeChange', newval);
        },
    },
    methods: {
        clickButton() {
            if (this.onButtonClick) this.onButtonClick();
            if (this.closeOnButtonClick) this.active = false;
        },
        clickSnackbar() {
            if (this.onClick) this.onClick();
            if (this.closeOnClick) this.active = false;
        },
    },
    mounted() {
        this.active = true;
    },
}
</script>