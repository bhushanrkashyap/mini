class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    insertAtHead(value) {
        const newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;
        this.length++;
    }

    insertAtTail(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.length++;
            return;
        }
        
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
        this.length++;
    }

    insertAtPosition(value, position) {
        if (position < 0 || position > this.length) {
            return false;
        }

        if (position === 0) {
            this.insertAtHead(value);
            return true;
        }

        const newNode = new Node(value);
        let current = this.head;
        let prev = null;
        let index = 0;

        while (index < position) {
            prev = current;
            current = current.next;
            index++;
        }

        prev.next = newNode;
        newNode.next = current;
        this.length++;
        return true;
    }

    deleteFromHead() {
        if (!this.head) {
            return null;
        }

        const deletedValue = this.head.value;
        this.head = this.head.next;
        this.length--;
        return deletedValue;
    }

    deleteFromTail() {
        if (!this.head) {
            return null;
        }

        if (!this.head.next) {
            const deletedValue = this.head.value;
            this.head = null;
            this.length--;
            return deletedValue;
        }

        let current = this.head;
        let prev = null;

        while (current.next) {
            prev = current;
            current = current.next;
        }

        const deletedValue = current.value;
        prev.next = null;
        this.length--;
        return deletedValue;
    }

    search(value) {
        let current = this.head;
        let position = 0;

        while (current) {
            if (current.value === value) {
                return position;
            }
            current = current.next;
            position++;
        }
        return -1;
    }

    reverse() {
        if (!this.head || !this.head.next) {
            return;
        }

        let prev = null;
        let current = this.head;
        let next = null;

        while (current) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }

        this.head = prev;
    }

    clear() {
        this.head = null;
        this.length = 0;
    }

    toArray() {
        const arr = [];
        let current = this.head;
        while (current) {
            arr.push(current.value);
            current = current.next;
        }
        return arr;
    }
}

let linkedList = new LinkedList();

const svg = d3.select("#linkedListSvg");
const width = 1200;
const height = 250;
svg.attr("viewBox", `0 0 ${width} ${height}`);

svg.append("defs").append("marker")
    .attr("id", "arrowhead")
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 10)
    .attr("refY", 5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z")
    .attr("fill", "#4f46e5");

const ANIMATION_DURATION = 500;

function visualize(highlightIndex = -1) {
    const nodes = linkedList.toArray();
    const nodeRadius = 30;
    const nodeSpacing = 150;
    const startX = 100;
    const centerY = height / 2;

    svg.selectAll("*:not(defs)").remove();

    const lengthElement = document.getElementById('listLength');
    lengthElement.style.animation = 'pulse 0.5s';
    setTimeout(() => lengthElement.style.animation = '', 500);
    lengthElement.textContent = linkedList.length;

    if (nodes.length === 0) {
        const emptyGroup = svg.append("g")
            .attr("transform", `translate(${width/2}, ${centerY})`);
        
        emptyGroup.append("circle")
            .attr("r", 0)
            .attr("fill", "#f3f4f6")
            .attr("stroke", "#d1d5db")
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "5,5")
            .transition()
            .duration(400)
            .attr("r", 50);
        
        emptyGroup.append("text")
            .attr("y", -10)
            .attr("text-anchor", "middle")
            .attr("font-size", "30px")
            .attr("opacity", 0)
            .text("📋")
            .transition()
            .delay(200)
            .duration(300)
            .attr("opacity", 1);
        
        emptyGroup.append("text")
            .attr("y", 25)
            .attr("text-anchor", "middle")
            .attr("font-size", "14px")
            .attr("font-weight", "600")
            .attr("fill", "#9ca3af")
            .attr("opacity", 0)
            .text("List is empty")
            .transition()
            .delay(300)
            .duration(300)
            .attr("opacity", 1);
        
        return;
    }

    const totalWidth = (nodes.length - 1) * nodeSpacing + 200;
    const offsetX = totalWidth > width ? 0 : (width - totalWidth) / 2;

    for (let i = 0; i < nodes.length; i++) {
        const x = startX + i * nodeSpacing + offsetX;
        
        if (i < nodes.length - 1) {
            const arrow = svg.append("line")
                .attr("stroke", "#4f46e5")
                .attr("stroke-width", 2.5)
                .attr("marker-end", "url(#arrowhead)")
                .attr("x1", x + nodeRadius)
                .attr("y1", centerY)
                .attr("x2", x + nodeRadius)
                .attr("y2", centerY)
                .attr("opacity", 0);
            
            arrow.transition()
                .delay(i * 100)
                .duration(ANIMATION_DURATION)
                .attr("x2", x + nodeSpacing - nodeRadius)
                .attr("opacity", 1);
        } else {
            svg.append("text")
                .attr("x", x + nodeRadius + 40)
                .attr("y", centerY + 5)
                .attr("fill", "#ef4444")
                .attr("font-size", "14px")
                .attr("font-weight", "700")
                .text("NULL")
                .attr("opacity", 0)
                .transition()
                .delay(nodes.length * 100)
                .duration(ANIMATION_DURATION)
                .attr("opacity", 1);
        }
    }

    const nodeGroups = svg.selectAll(".node-group")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node-group")
        .attr("transform", (d, i) => `translate(${startX + i * nodeSpacing + offsetX}, ${centerY})`);

    nodeGroups.append("circle")
        .attr("r", 0)
        .attr("fill", (d, i) => i === highlightIndex ? "#10b981" : "#6366f1")
        .attr("stroke", (d, i) => i === highlightIndex ? "#059669" : "#4f46e5")
        .attr("stroke-width", (d, i) => i === highlightIndex ? 3 : 2.5)
        .style("filter", (d, i) => i === highlightIndex 
            ? "drop-shadow(0 4px 8px rgba(16, 185, 129, 0.4))" 
            : "drop-shadow(0 2px 4px rgba(0,0,0,0.1))")
        .style("cursor", "pointer")
        .transition()
        .delay((d, i) => i * 100)
        .duration(ANIMATION_DURATION)
        .attr("r", (d, i) => i === highlightIndex ? nodeRadius + 3 : nodeRadius);

    if (highlightIndex >= 0) {
        nodeGroups.filter((d, i) => i === highlightIndex)
            .append("circle")
            .attr("r", nodeRadius + 3)
            .attr("fill", "none")
            .attr("stroke", "#10b981")
            .attr("stroke-width", 2)
            .attr("opacity", 0)
            .transition()
            .delay(highlightIndex * 100)
            .duration(1000)
            .attr("r", nodeRadius + 15)
            .attr("opacity", 0)
            .ease(d3.easeExpOut);
    }

    nodeGroups.append("text")
        .text(d => d)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", "white")
        .attr("font-weight", "bold")
        .attr("font-size", "16px")
        .attr("opacity", 0)
        .transition()
        .delay((d, i) => i * 100 + ANIMATION_DURATION / 2)
        .duration(ANIMATION_DURATION / 2)
        .attr("opacity", 1);

    nodeGroups.append("text")
        .attr("y", nodeRadius + 20)
        .attr("text-anchor", "middle")
        .attr("font-size", "11px")
        .attr("font-weight", "600")
        .attr("fill", (d, i) => i === 0 ? "#4f46e5" : "#6b7280")
        .text((d, i) => i === 0 ? `[${i}] HEAD` : `[${i}]`)
        .attr("opacity", 0)
        .transition()
        .delay((d, i) => i * 100 + ANIMATION_DURATION)
        .duration(ANIMATION_DURATION / 2)
        .attr("opacity", 1);

    nodeGroups.selectAll("circle")
        .on("mouseover", function(event, d) {
            d3.select(this)
                .transition()
                .duration(200)
                .attr("r", nodeRadius + 5)
                .style("filter", "drop-shadow(0 4px 8px rgba(99, 102, 241, 0.4))");
        })
        .on("mouseout", function(event, d) {
            const i = nodes.indexOf(d);
            d3.select(this)
                .transition()
                .duration(200)
                .attr("r", i === highlightIndex ? nodeRadius + 3 : nodeRadius)
                .style("filter", i === highlightIndex 
                    ? "drop-shadow(0 4px 8px rgba(16, 185, 129, 0.4))" 
                    : "drop-shadow(0 2px 4px rgba(0,0,0,0.1))");
        });
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 12px;
        font-weight: 600;
        font-size: 14px;
        color: white;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    } else if (type === 'info') {
        notification.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(style);
}

function insertAtHead() {
    const input = document.getElementById('headValue');
    const value = parseInt(input.value);
    if (isNaN(value)) {
        input.style.animation = 'shake 0.3s';
        setTimeout(() => input.style.animation = '', 300);
        return;
    }
    
    linkedList.insertAtHead(value);
    visualize(0);
    input.value = '';
}

function insertAtTail() {
    const input = document.getElementById('tailValue');
    const value = parseInt(input.value);
    if (isNaN(value)) {
        input.style.animation = 'shake 0.3s';
        setTimeout(() => input.style.animation = '', 300);
        return;
    }
    
    linkedList.insertAtTail(value);
    visualize(linkedList.length - 1);
    input.value = '';
}

function insertAtPosition() {
    const valueInput = document.getElementById('posValue');
    const posInput = document.getElementById('position');
    const value = parseInt(valueInput.value);
    const position = parseInt(posInput.value);
    
    if (isNaN(value) || isNaN(position)) {
        valueInput.style.animation = 'shake 0.3s';
        posInput.style.animation = 'shake 0.3s';
        setTimeout(() => {
            valueInput.style.animation = '';
            posInput.style.animation = '';
        }, 300);
        return;
    }
    
    if (linkedList.insertAtPosition(value, position)) {
        visualize(position);
        valueInput.value = '';
        posInput.value = '';
    } else {
        posInput.style.animation = 'shake 0.3s';
        setTimeout(() => posInput.style.animation = '', 300);
    }
}

function deleteFromHead() {
    if (linkedList.length === 0) {
        return;
    }
    
    linkedList.deleteFromHead();
    visualize();
}

function deleteFromTail() {
    if (linkedList.length === 0) {
        return;
    }
    
    linkedList.deleteFromTail();
    visualize();
}

function searchNode() {
    const input = document.getElementById('searchValue');
    const messageDiv = document.getElementById('searchMessage');
    const value = parseInt(input.value);
    if (isNaN(value)) {
        input.style.animation = 'shake 0.3s';
        setTimeout(() => input.style.animation = '', 300);
        return;
    }
    
    const position = linkedList.search(value);
    if (position !== -1) {
        visualize(position);
        messageDiv.textContent = `✅ Found ${value} at position ${position}`;
        messageDiv.style.color = '#10b981';
    } else {
        visualize();
        messageDiv.textContent = `❌ Value ${value} not found in list`;
        messageDiv.style.color = '#ef4444';
    }
    input.value = '';
    
    setTimeout(() => {
        messageDiv.textContent = '';
    }, 3000);
}

function reverseList() {
    if (linkedList.length === 0) {
        return;
    }
    
    linkedList.reverse();
    visualize();
}

function clearList() {
    if (linkedList.length === 0) {
        return;
    }
    
    linkedList.clear();
    visualize();
}

function generateRandom() {
    linkedList.clear();
    const count = Math.floor(Math.random() * 5) + 4;
    
    for (let i = 0; i < count; i++) {
        const value = Math.floor(Math.random() * 90) + 10;
        linkedList.insertAtTail(value);
    }
    
    visualize();
}

document.getElementById('headValue')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') insertAtHead();
});

document.getElementById('tailValue')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') insertAtTail();
});

document.getElementById('searchValue')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchNode();
});

document.getElementById('position')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') insertAtPosition();
});

window.addEventListener('DOMContentLoaded', () => {
    generateRandom();
});
