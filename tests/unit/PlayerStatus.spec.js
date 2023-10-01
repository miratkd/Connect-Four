import { mount } from "@vue/test-utils";
import PlayerStatus from "@/components/PlayerStatus.vue"

describe("PlayerStatus", () => {

    it('Should show player 1 info', () => {
        let wrapper
        wrapper = mount(PlayerStatus, {
            propsData: {
                player:1,
                name: 'Lucas',
                score: 5
            }
        })
        const nameValue = wrapper.get('[data-test=player-name]')
        let scoreValue = wrapper.get('[data-test=player-score]')
        const icon1Value = wrapper.findAll('[data-test=player-icon-1]')
        const icon2Value = wrapper.findAll('[data-test=player-icon-2]')
        const iconCpuValue = wrapper.findAll('[data-test=player-icon-cpu]')
        expect(nameValue.text()).toBe('Lucas')
        expect(scoreValue.text()).toBe('5')
        expect(icon1Value.length).toBe(1)
        expect(icon2Value.length).toBe(0)
        expect(iconCpuValue.length).toBe(0)
    })

    it('Should show player 2 info', () => {
        let wrapper
        wrapper = mount(PlayerStatus, {
            propsData: {
                player: 2,
                name: 'Rafael',
                score: 10
            }
        })
        const nameValue = wrapper.get('[data-test=player-name]')
        const scoreValue = wrapper.get('[data-test=player-score]')
        const icon1Value = wrapper.findAll('[data-test=player-icon-1]')
        const icon2Value = wrapper.findAll('[data-test=player-icon-2]')
        const iconCpuValue = wrapper.findAll('[data-test=player-icon-cpu]')
        expect(nameValue.text()).toBe('Rafael')
        expect(scoreValue.text()).toBe('10')
        expect(icon1Value.length).toBe(0)
        expect(icon2Value.length).toBe(1)
        expect(iconCpuValue.length).toBe(0)
    })

    it('Should show cpu info', () => {
        let wrapper
        wrapper = mount(PlayerStatus, {
            propsData: {
                player: 'cpu',
                name: 'CPU',
                score: 2
            }
        })
        const nameValue = wrapper.get('[data-test=player-name]')
        const scoreValue = wrapper.get('[data-test=player-score]')
        const icon1Value = wrapper.findAll('[data-test=player-icon-1]')
        const icon2Value = wrapper.findAll('[data-test=player-icon-2]')
        const iconCpuValue = wrapper.findAll('[data-test=player-icon-cpu]')
        expect(nameValue.text()).toBe('CPU')
        expect(scoreValue.text()).toBe('2')
        expect(icon1Value.length).toBe(0)
        expect(icon2Value.length).toBe(0)
        expect(iconCpuValue.length).toBe(1)
    })
} )