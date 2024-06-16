<script setup>
    import useSkills from '@/composables/skills';
    import { onMounted } from 'vue';

    const { skills, getSkills, destroySkill } = useSkills();

    onMounted(() => getSkills());
</script>
<template>
    <div class="mt-12">
        <div class="flex justify-end m-2 p-2">
            <RouterLink 
                class="px-4 py-2 bg-indigo-600 hover:bg-indigo-800 text-white rounded"
                :to="{ name: 'SkillCreate' }">New Skill</RouterLink>
        </div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Slug
                    </th>
                    <th scope="col" class="px-6 py-3">
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr 
                    v-for="skill in skills"
                    key="skill.id"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                    <td class="py-4 px-6">
                        {{ skill.name }}
                    </td>
                    <td class="py-4 px-6">
                        {{ skill.slug }}
                    </td>
                    <td class="py-4 px-6 space-x-2">
                        <RouterLink 
                            :to="{ name:'SkillEdit', params: { id: skill.id }}" 
                            class="px-4 py-2 bg-green-600 hover:bg-green-800 text-white rounded"
                        >
                            Edit
                        </RouterLink>

                        <button 
                        @click="destroySkill(skill.id)"
                            class="px-4 py-2 bg-red-600 hover:bg-red-800 text-white rounded"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>